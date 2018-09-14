Rails.application.routes.draw do
  scope '/api', defaults: {format: :json} do
  	post 'download/:type', to: 'downloads#download', type: /(p|w){1}/
  	post 'mail/send', to: 'emails#send_mail'
  	post 'signature/url', to: 'signatures#get_signature_url'
  	post 'signature/receiver', to: 'pages#signature_received'
  	post 'mail/receipt', to: 'email_delivery_receipts#get_email_delivery_receipt'
  	get 'statistics/sent', to: 'statistics#sent_requests_by_month'
    get 'statistics/sent/live', to: 'statistics#sent_request_live'
  	resources :recipients,  only: [:index]
  end 
  get '/', to: 'pages#index'
end
