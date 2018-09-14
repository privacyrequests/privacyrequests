class DownloadsController < ApplicationController
	def download
		@enquiry = JSON.parse(request.body.read())
		@enquiry["recipients"].map! {|recipient| Recipient.find(recipient["id"]) rescue recipient }
		send_file((@enquiry["recipients"].length > 1) ? EnquiryFiles.new(params[:type], @enquiry) : EnquiryFile.new(params[:type], @enquiry))
	end
	
	private

	def send_file(file)
		response.set_header("X-Filename", file.filename)
		send_data file.content, type: file.mime, filename: file.filename
	end
end