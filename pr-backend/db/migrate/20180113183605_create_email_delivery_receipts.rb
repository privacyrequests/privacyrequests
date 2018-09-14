class CreateEmailDeliveryReceipts < ActiveRecord::Migration[5.1]
  def change
    create_table :email_delivery_receipts do |t|
      t.timestamp :sent_at
      t.string :message_id
      t.string :content_id
      t.string :recipient_email
      t.string :file_hash
      t.string :queue_id
      t.string :message
      t.string :passphrase

      t.timestamps
    end
  end
end
