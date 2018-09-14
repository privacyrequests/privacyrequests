class RecipientsController < ApplicationController	
	def index
		recipients = Recipient.order(:name)
		render json: recipients, status: :ok
	end
end