class PagesController < ActionController::Base

	def index
		render template: "pages/index", :formats => [:html] 
	end

	def signature_received
		render template: "pages/signature_received", :formats => [:html], :locals => { :signature => (Hash.from_xml(params["XMLResponse"])["CreateCMSSignatureResponse"]["CMSSignature"]).squish }
	end

end