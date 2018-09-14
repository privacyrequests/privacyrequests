class EmailDeliveryReceiptsController < ApplicationController	
	def get_email_delivery_receipt
		passphrase = JSON.parse(request.body.read())['passphrase'].split().pack("H*") rescue nil
		if passphrase
			render json: EmailDeliveryReceipt.find_by(passphrase: passphrase)
		else
			render :status => 404
		end
	end
end