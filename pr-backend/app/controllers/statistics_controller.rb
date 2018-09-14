class StatisticsController < ApplicationController
	def sent_requests_by_month
		render json: { 
			"labels" => 6.downto(1).map { |n| I18n.t("date.month_names").drop(1)[(Date.today.month - n) % 12] }, 
			"datasets" => [
				{
					"backgroundColor" => "#2c3e50",
					"data" => EmailDeliveryReceipt.group_by_month(:sent_at, range: 5.month.ago.midnight..Time.now).count.values
				}
			]
		}
	end

	def sent_request_live
		render json: { 
			"labels" => 11.downto(0).map { |n| (Time.now-n.hours).hour.to_s + " Uhr" }, 
			"datasets" => [
				{
					"borderColor" => "#2c3e50",
					"data" => EmailDeliveryReceipt.group_by_hour(:sent_at, range: 11.hours.ago..Time.now).count.values
				}
			]
		}
	end
end
