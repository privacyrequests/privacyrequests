class ConfirmationMailer < ApplicationMailer
	def confirmation_mail(enquiry, recipient, pdf, passphrase)
		@enquiry = enquiry
		@recipient = recipient
		@pdf = pdf
		@passphrase = passphrase
		@frontend_url = Rails.configuration.frontendUrl + "/sendebericht"
		attachments[(@enquiry.dig("email", "attachmentName") || "Antrag_auf_Auskunft")+".pdf"] = pdf
		mail(
			to: @enquiry["enquirer"]["email"],
			reply_to: Rails.configuration.reply_to_email,
			subject: "Erfolgreicher Versand Ihres Auskunftsbegehrens"
		) do |format|
			format.text
		end
	end
end
