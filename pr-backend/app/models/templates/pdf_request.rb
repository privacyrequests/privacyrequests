require "prawn/measurement_extensions"

class PdfRequest
	def self.render_to_string(context = {})
		@context = context
		@pdf = Prawn::Document.new(:page_size => "A4", :page_layout => :portrait, :top_margin => 10.mm, :right_margin => 20.mm, :bottom_margin => 10.mm, :left_margin => 20.mm, :skip_page_creation => false, :compress => false, :optimize_objects => false, :background => nil, :info => nil, :template => nil)
		@pdf.font "Helvetica"
		@pdf.font_size 12

		header
		return_address
		recipient_address
		city_and_date
		subject
		fold_marks
		letter_body

		if (@context.dig("signature", "signatureDataURL"))
			@pdf.move_down 0.25.cm
			signature
			@pdf.move_down 2.cm
		else
			@pdf.text "\n\n"
		end
		
		@pdf.text_box("#{@context["enquirer"]["firstName"]} #{@context["enquirer"]["lastName"]}", at: [5.mm, @pdf.cursor])

		if (@context.dig("signature", "idDataURL"))
			@pdf.move_down 2.cm
			@pdf.text_box("Anlage: Ausweiskopie", at: [5.mm, @pdf.cursor])
			identity_proof
		end

		article

		return @pdf.render
	end

	private

	def self.header
		@pdf.default_leading 1.15
		@pdf.text "#{@context["enquirer"]["firstName"]} #{@context["enquirer"]["lastName"]}"
		@pdf.text "#{@context["enquirer"]["address"]}"
		@pdf.text "#{@context["enquirer"]["postcode"]} #{@context["enquirer"]["city"]}"
		@pdf.text "E-Mail: #{@context["enquirer"]["email"]}"
		@pdf.stroke_line [0, 725], [171.mm, 725]
	end

	def self.return_address
		text = "#{@context["enquirer"]["firstName"]} #{@context["enquirer"]["lastName"]}, #{@context["enquirer"]["address"]}, #{@context["enquirer"]["postcode"]} #{@context["enquirer"]["city"]}"
		@pdf.text_box(text,
			at:       [0.mm, 297.mm-58.mm],
			width:    85.mm,
			height:   7.mm,
			size:     8.5,
			align:    :left,
			overflow: :shrink_to_fit,
			)
		@pdf.stroke_line [0, 297.mm-62.mm], [@pdf.width_of(text, :size => 8.5), 297.mm-62.mm]
	end

	def self.recipient_address
		@pdf.text_box("#{@context["recipients"][0]["name"]}\n#{@context["recipients"][0]["address"]}\n#{@context["recipients"][0]["postcode"]} #{@context["recipients"][0]["city"]}\n#{@context["recipients"][0]["country"]}",
			at:       [0.mm, 297.mm-72.mm],
			width:    85.mm,
			height:   27.3.mm,
			size:     12,
			align:    :left,
			overflow: :shrink_to_fit,
			)
	end

	def self.city_and_date
		@pdf.text_box("#{@context["enquirer"]["city"]}, am #{Time.now.strftime("%d.%m.%Y")}",
			at:       [92.mm, 297.mm-110.mm],
			width:    75.mm,
			height:   4.mm,
			size:     12,
			align:    :right,
			overflow: :shrink_to_fit,
			)
	end

	def self.subject
		@pdf.text_box("Antrag gemäß Art. 15 DSGVO auf Auskunft",
			at:       [5.mm, 297.mm-120.mm],
			width:    170.mm,
			height:   4.mm,
			size:     12,
			align:    :left,
			font: "Helvetica", :style => :bold
			)
	end

	def self.letter_body
		@pdf.text_box("Sehr geehrte Damen und Herren,",
			at:       [5.mm, 297.mm-135.mm],
			width:    65.mm,
			height:   4.mm,
			size:     12,
			align:    :left
			)

		@pdf.bounding_box([5.mm, 297.mm-145.mm], :width => 162.5.mm) do
			@pdf.text "hiermit stelle ich (#{@context["enquirer"]["firstName"]} #{@context["enquirer"]["lastName"]}) gemäß Art. 15 Datenschutz-Grundverordnung (Verordnung (EU) 2016/679 des Europäischen Parlaments und des Rates vom 27. April 2016 zum Schutz natürlicher Personen bei der Verarbeitung personenbezogener Daten, zum freien Datenverkehr und zur Aufhebung der Richtlinie 95/46/EG, DSGVO) Antrag auf Auskunft.\n\n"

			setEnquiryType
			setOptionalEnquiryType

			if (@context.dig("signature", "idDataURL"))
				@pdf.text "Als Beweis meiner Identität befindet sich als Anlage eine Kopie meines amtlichen Lichtbildausweises.\n\n"			
			end

			if (@context.key?("signature") && @context["signature"].key?("digitalSignature"))
				@pdf.text "Als Beweis meiner Identität ist dieses Dokument gemäß EU Verordnung Nr. 910/2014 (eIDAS) elektronisch signiert. Sie können diese Signatur unter https://www.signaturpruefung.gv.at verifizieren.\n\n"
			end

			@pdf.text "Ein Auszug des Art. 15 DSGVO über das Auskunftsrecht befindet sich am Ende dieses Dokuments.\n\n"			
			@pdf.text "Mit freundlichen Grüßen,"
		end
	end

	def self.setEnquiryType
		if (@context["enquiryType"]["type"] == 1)
			@pdf.text "Ich ersuche um Auskunft über alle zu meiner Person gespeicherten Daten.\n\n"
		elsif (@context["enquiryType"]["type"] == 2)
			@pdf.text "Ich ersuche um Auskunft über meine Daten aus einer bestimmten Datenanwendung, nämlich: <i>#{@context["enquiryType"]["additionalText"]}</i>\n\n", :inline_format => true
		elsif (@context["enquiryType"]["type"] == 3)
			@pdf.text "Ich ersuche um Auskunft über meine Daten im Zusammenhang mit einem bestimmten Ereignis, nämlich: <i>#{@context["enquiryType"]["additionalText"]}</i>\n\n", :inline_format => true
		end
	end

	def self.setOptionalEnquiryType
		@context["optionalEnquiryTypes"].each do |enquiryType|
			if enquiryType["type"] == 4
				@pdf.text "Ich ersuche um Auskunft über den logischen Ablauf einer automatisierten Entscheidungsfindung einschließlich Profiling (Artikel 22 Absätze 1 und 4 DSGVO), nämlich: <i>#{enquiryType["additionalText"]}</i>\n\n", :inline_format => true
			elsif enquiryType["type"] == 5
				@pdf.text "Bitte erteilen Sie mir auch Auskunft über Ihre Dienstleister.\n\n"
			end
		end
	end

	def self.fold_marks
		@pdf.stroke_line([-17.mm, 77.mm], [-15.mm, 77.mm])
		@pdf.stroke_line([-17.mm, 182.mm], [-15.mm, 182.mm])
		@pdf.stroke_line([-17.mm, 138.5.mm], [-13.mm, 138.5.mm])
	end

	def self.signature
		signatureImage = @context["signature"]["signatureDataURL"]
		signatureImage = StringIO.new(Base64.decode64(signatureImage[(signatureImage.index(',') + 1) .. -1]))
		@pdf.image signatureImage, :fit => [5.5.cm, 1.83.cm], :at => [5.mm, @pdf.cursor]
	end

	def self.identity_proof
		idImage = @context["signature"]["idDataURL"]
		idImage = StringIO.new(Base64.decode64(idImage[(idImage.index(',') + 1) .. -1]))
		@pdf.start_new_page
		@pdf.image idImage, :fit => [18.cm, 10.cm]
		@pdf.text "\n(Ausweiskopie: #{@context["enquirer"]["firstName"]} #{@context["enquirer"]["lastName"]})"
	end

	def self.article
		@pdf.start_new_page
		@pdf.font "Helvetica", :style => :bold
		@pdf.move_down 1.cm
		@pdf.text "Art. 15 DSGVO Auskunftsrecht der betroffenen Person\n\n"
		@pdf.font "Helvetica", :style => :italic
		@pdf.text "(1) Die betroffene Person hat das Recht, von dem Verantwortlichen eine Bestätigung darüber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden; ist dies der Fall, so hat sie ein Recht auf Auskunft über diese personenbezogenen Daten und auf folgende Informationen:\n\n" + 
		"a)\t\tdie Verarbeitungszwecke;\n\n" +
		"b)\t\tdie Kategorien personenbezogener Daten, die verarbeitet werden;\n\n" +
		"c)\t\tdie Empfänger oder Kategorien von Empfängern, gegenüber denen die personenbezogenen Daten offengelegt worden sind oder noch offengelegt werden, insbesondere bei Empfängern in Drittländern oder bei internationalen Organisationen;\n\n" +
		"d)\t\tfalls möglich die geplante Dauer, für die die personenbezogenen Daten gespeichert werden, oder, falls dies nicht möglich ist, die Kriterien für die Festlegung dieser Dauer;\n\n" +
		"e)\t\tdas Bestehen eines Rechts auf Berichtigung oder Löschung der sie betreffenden personenbezogenen Daten oder auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung;\n\n" +
		"f)\t\tdas Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde;\n\n" +
		"g)\t\twenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden, alle verfügbaren Informationen über die Herkunft der Daten;\n\n" +
		"h)\t\tdas Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling gemäß Artikel 22 Absätze 1 und 4 DSGVO und — zumindest in diesen Fällen — aussagekräftige Informationen über die involvierte Logik sowie die Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung für die betroffene Person.\n\n" +
		"(2) Werden personenbezogene Daten an ein Drittland oder an eine internationale Organisation übermittelt, so hat die betroffene Person das Recht, über die geeigneten Garantien gemäß Artikel 46 DSGVO im Zusammenhang mit der Übermittlung unterrichtet zu werden.\n\n" +
		"(3) Der Verantwortliche stellt eine Kopie der personenbezogenen Daten, die Gegenstand der Verarbeitung sind, zur Verfügung. Für alle weiteren Kopien, die die betroffene Person beantragt, kann der Verantwortliche ein angemessenes Entgelt auf der Grundlage der Verwaltungskosten verlangen. Stellt die betroffene Person den Antrag elektronisch, so sind die Informationen in einem gängigen elektronischen Format zur Verfügung zu stellen, sofern sie nichts anderes angibt.\n\n" +
		"(4) Das Recht auf Erhalt einer Kopie gemäß Absatz 1b darf die Rechte und Freiheiten anderer Personen nicht beeinträchtigen."
	end
end