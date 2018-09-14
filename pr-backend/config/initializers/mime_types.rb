# Be sure to restart your server when you modify this file.

# Add new mime types for use in respond_to blocks:
# Mime::Type.register "text/richtext", :rtf

Mime::Type.register "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8", :word
Mime::Type.register "application/pdf;charset=utf-8", :pdf
Mime::Type.register "application/zip;charset=utf-8", :zip
Mime::Type.register "application/json", :json, %w( text/x-json application/jsonrequest )  
Mime::Type.register "application/x-www-form-urlencoded", :url_encoded_form