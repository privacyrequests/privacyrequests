class ApplicationMailer < ActionMailer::Base
	default from: "PrivacyRequests <#{Rails.configuration.sender_email}>"
end
