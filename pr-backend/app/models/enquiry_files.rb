class EnquiryFiles
	attr_reader :filename, :mime, :content

	def initialize(type, enquiry)
		@filename = enquiry["enquirer"]["lastName"]+"_Ersuchen_um_Auskunft.zip"
		@mime = :zip
		file_stream = Zip::OutputStream.write_buffer do |zip|
			enquiry["recipients"].each do |recipient|
				file = EnquiryFile.new(type, enquiry)
				zip.put_next_entry recipient["name"] + "_" + file.filename
				zip.write file.content
				enquiry["recipients"] = enquiry["recipients"].drop(1)
			end
		end
		file_stream.rewind
		@content = file_stream
	end
end