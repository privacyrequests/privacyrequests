Rails.application.configure do

  # Disable class caching
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  if Rails.root.join('tmp/caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.seconds.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # The url of the frontend application
  config.frontendUrl = "http://example.com"

  # The url that the external signature service handler uses to send the result to
  config.publicUrl = "http://api.example.com"

  # The url of the external signature service handler
  config.signatureHandlerUrl = "https://test1.a-trust.at/mobile/https-security-layer-request/default.aspx"

  # The email address that user may reply to  
  config.reply_to_email = "info@example.com"

  # The email address that actual sends the emails 
  config.sender_email = "no-reply@example.com"

  # Email sending / SMTP settings
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.perform_caching = false  
  config.action_mailer.perform_deliveries = true
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address:              'smtp.example.com',
    port:                 587,
    domain:               'example.com',
    user_name:            'user',
    password:             'pass',
    return_response:      true 
  }

  # i18n settings and locales
  config.i18n.available_locales = :de
  config.i18n.default_locale = :de

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load


  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker
end
