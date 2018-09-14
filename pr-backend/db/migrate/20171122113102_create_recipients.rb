class CreateRecipients < ActiveRecord::Migration[5.1]
  def change
    create_table :recipients do |t|
      t.string :name
      t.string :address
      t.string :postcode
      t.string :city
      t.string :country
      t.string :email
    end
  end
end
