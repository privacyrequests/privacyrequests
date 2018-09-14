module Origami
    PDF.class_eval do
        #
        # Inserts an invisible signature into the PDF with an empty /Content prepared for external signing
        #
        def prepare_signature(
            name: nil,
            location: nil,
            contact: nil,
            reason: nil,
            method: Signature::PKCS7_DETACHED,
            content_size: 4096)

            # Create Digital Signature Object in PDF
            digsig = Signature::DigitalSignature.new.set_indirect(true)

            # Create Annotation Object for Digital Signature
            annotation = Annotation::Widget::Signature.new
            annotation.FT = :Sig
            annotation.V = digsig
            add_fields(annotation)
            
            # Set Flags for PDF Reader
            self.Catalog.AcroForm.SigFlags = InteractiveForm::SigFlags::SIGNATURES_EXIST | InteractiveForm::SigFlags::APPEND_ONLY

            digsig.Type = :Sig
            digsig.Filter = Name.new("Adobe.PPKLite")  # Method should be Adobe.PPKLite
            digsig.SubFilter = Name.new(method) # Signature sub method
            digsig.Contents = HexaString.new("\x00" * content_size) # Placeholder for actual signature, try to leave enough space for the signature or ByteRange has to be updated 
            digsig.ByteRange = [0, 0, 0, 0] # Init empty ByteRange
            digsig.Name = HexaString.new(name) if name # Hex String to deal with non ascii chars
            digsig.Location = HexaString.new(location) if location
            digsig.ContactInfo = HexaString.new(contact) if contact
            digsig.Reason = HexaString.new(reason) if reason
            compile
            rebuild_dummy_xrefs
            sig_offset = get_object_offset(digsig.no, digsig.generation) + digsig.signature_offset
            
            # Calc correct ByteRange for Signature
            # ByteRange MUST be correct otherwise Signature is not valid
            digsig.ByteRange[0] = 0 # Always 0
            digsig.ByteRange[1] = sig_offset # Char '<' in /Content <asdf>
            digsig.ByteRange[2] = sig_offset + digsig.Contents.to_s.bytesize # Char after '>' in /Content <asdf>
            
            # Last Byte minus ByteRange[2] from above
            until digsig.ByteRange[3] == filesize - digsig.ByteRange[2]
                digsig.ByteRange[3] = filesize - digsig.ByteRange[2]
            end
        
            rebuild_xrefs
            filedata = output()
            
            # Sign everything except the Contents HexString
            signable_data = filedata[digsig.ByteRange[0],digsig.ByteRange[1]] + filedata[digsig.ByteRange[2],digsig.ByteRange[2]+digsig.ByteRange[3]]
            
            return Base64.encode64 signable_data # Return Base64 encoded signable data
        end

        #
        # Inserts the signature after the PDF has been prepared
        #
        def insert_signature(signature_base64)
            signature = Base64.decode64 signature_base64 # decode the signature
            begin
                digsig = self.signature
            rescue  SignatureError
                raise "Document is not prepared for insert sign, call method prepare_for_sign first"
            end

            signature = OpenSSL::PKCS7.new(signature).to_der # Convert Signature to DER encoding
            digsig.Contents[0, signature.size] = signature # Insert the signature into the Contents
            self.freeze # No more modification are allowed after signing.
        end
    end
end