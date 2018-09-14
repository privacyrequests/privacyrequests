class EmailsController < ApplicationController
	def send_mail
		enquiry = JSON.parse(request.body.read())

		enquiry["recipients"].map! {|recipient| Recipient.find(recipient["id"]) rescue recipient }
		
		recipient = enquiry["recipients"][0]

		pdf = EnquiryFile.new("p", enquiry).content

		verified_message = ActiveSupport::MessageVerifier.new(Rails.application.secrets.signing_key).verify(enquiry["signature"]["mac"])

		if (verified_message[:md5] != Digest::MD5.hexdigest(enquiry["signature"]["preparedPdf"]) || Time.now > verified_message[:expires])
			render :nothing => true, :status => 403 and return
		end

		response = RequestMailer.request_mail(enquiry, recipient, pdf).deliver_now!
		
		if (response.success?)
			random_passphrase = SecureRandom.hex(8)
			receipt = EmailDeliveryReceipt.create(sent_at: Time.now, message: response.message, recipient_email: recipient.email, file_hash: Digest::MD5.hexdigest(pdf), passphrase: random_passphrase)
			passphrase = random_passphrase.unpack("H*")[0]
			
			ConfirmationMailer.confirmation_mail(enquiry, recipient, pdf, passphrase).deliver_now!

			render json: {"emailDetails" => receipt, "passphrase" => passphrase}
		end
	end
end