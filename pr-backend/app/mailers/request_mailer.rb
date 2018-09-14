class RequestMailer < ApplicationMailer
	def request_mail(enquiry, recipient, pdf)
		@enquiry = enquiry
		attachments[(enquiry.dig("email", "attachmentName") || "Antrag_auf_Auskunft")+".pdf"] = pdf
		mail(
			#TODO: Change in real production scenario
			to: enquiry["enquirer"]["email"],
			
			reply_to: enquiry["enquirer"]["email"],
			subject: enquiry.dig("email", "subject") || "Ersuchen um Auskunft " + enquiry["enquirer"]["lastName"]
		) do |format|
			if (enquiry.dig("email", "body"))
				format.text { render plain: enquiry.dig("email", "body")}
			else
				format.text
			end
		end
	end
end