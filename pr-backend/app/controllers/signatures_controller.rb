require 'net/http'
require 'net/https'
require 'uri'
require 'digest/md5'

class SignaturesController < ApplicationController

	def get_signature_url
		enquiry = JSON.parse(request.body.read())
		enquiry["recipients"].map! {|recipient| Recipient.find(recipient["id"]) rescue recipient }

		pdf = EnquiryFile.new("p", enquiry)
		pdf_for_signing_b64 = pdf.prepare_signature(enquiry)
		pdf_b64 = Base64.strict_encode64(pdf.content)
		xml_request = ActionController::Base.new().render_to_string(:template => "xml/cms_request", :layout => false, :locals => {:pdf_for_signing_b64 => pdf_for_signing_b64})

		uri = URI.parse(Rails.configuration.signatureHandlerUrl)
		http = Net::HTTP.new(uri.host, uri.port)
		http.use_ssl = true
		data = URI.encode_www_form([
					["XMLRequest", xml_request], 
					["DataURL", Rails.configuration.publicUrl + "/api/signature/receiver"]])
		resp, data = http.post(uri.path, data, {'Content-Type'=> 'application/x-www-form-urlencoded'})

		render json: {"url" => resp["location"], "pdf" => pdf_b64, "mac" => ActiveSupport::MessageVerifier.new(Rails.application.secrets.signing_key).generate(md5: Digest::MD5.hexdigest(pdf_b64), expires: Time.now + 15.minutes)}
	end
end