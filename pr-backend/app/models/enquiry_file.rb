require 'templates/pdf_request'

class EnquiryFile
	attr_reader :filename, :mime, :content

	def initialize(type, enquiry)
		@filename = enquiry["enquirer"]["lastName"]+"_Ersuchen_um_Auskunft"
		if (type == "w")
			@filename += ".docx"

			enquiry['image:signatureDataURL'] = enquiry["signature"]["signatureDataURL"]
			enquiry['image:idDataURL'] = enquiry["signature"]["idDataURL"]

			@mime = :word
			@content = Sablon.template("#{Rails.root}/app/models/templates/request_template.docx").render_to_string(enquiry)
		elsif (type == "p")
			@filename += ".pdf"
			@mime = :pdf
			@content = 
				if enquiry.dig("signature", "preparedPdf") && !enquiry["signature"]["preparedPdf"].blank?
					Base64.decode64(enquiry["signature"]["preparedPdf"])
				else
					PdfRequest.render_to_string(enquiry)
				end
			
			if enquiry.dig("signature", "digitalSignature") && !enquiry["signature"]["digitalSignature"].blank?
				insert_signature(enquiry["signature"]["digitalSignature"])
			end
		end
	end

	def prepare_signature(enquiry)
		if (@mime == :pdf)
			pdf = Origami::PDF.read(StringIO.new(@content, 'rb'))
			pdf_for_signing_base64 = pdf.prepare_signature(
				name: enquiry["enquirer"]["firstName"] + enquiry["enquirer"]["lastName"],
				location: enquiry["enquirer"]["city"],
				reason: "Validate signature at http://www.signaturpruefung.gv.at")
			file_helper = StringIO.new
			pdf.save(file_helper)
			@content = file_helper.string
			return pdf_for_signing_base64
		end
	end

	def insert_signature(signature)
		if @mime == :pdf
			pdf = Origami::PDF.read(StringIO.new(@content, "rb"))
			pdf.insert_signature(signature)
			file_helper = StringIO.new
			pdf.save(file_helper)
			@content = file_helper.string
		end
	end

end