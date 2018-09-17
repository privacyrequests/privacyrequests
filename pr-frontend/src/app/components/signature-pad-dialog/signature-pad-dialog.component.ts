import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
	selector: 'signature-pad-dialog',
	templateUrl: './signature-pad-dialog.component.html',
	styleUrls: ['./signature-pad-dialog.component.css']
})
export class SignaturePadDialogComponent implements AfterViewInit {

	@ViewChild(SignaturePad) signaturePad: SignaturePad;
	private startedSignature = false;

	public signaturePadOptions: Object = { //TODO: Responsive
		'canvasWidth': '556',
		'canvasHeight': '180'
	};

	constructor(public activeModal: NgbActiveModal) { }

	ngAfterViewInit() {
		this.addText();
	}

	addText() {
		let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
		let ctx = canvas.getContext("2d");
		
		ctx.textBaseline = 'middle';
		ctx.textAlign = "center";

		ctx.font = "30px Lato";
		ctx.fillStyle = "#b4bcc2";
		ctx.fillText("Hier unterschreiben",canvas.width/2,90);
	}

	signDocument() {
		if (this.startedSignature) {
			this.activeModal.close(this.prepareSignature());
		}
	}

	startSignature() {
		if (!this.startedSignature) {
			this.startedSignature = true;
			document.getElementsByTagName("canvas")[0].getContext("2d").clearRect(0, 0, 556, 180);
		}
	}

	clearSignature() {
		this.signaturePad.clear();
		this.addText();
		this.startedSignature = false;
	}

	prepareSignature() {
		//Removes whitespace around signature
		let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];

		let croppedCanvas:HTMLCanvasElement = document.createElement('canvas');
		let croppedCtx:CanvasRenderingContext2D = croppedCanvas.getContext("2d");

		croppedCanvas.width = canvas.width;
		croppedCanvas.height = canvas.height;
		croppedCtx.drawImage(canvas, 0, 0);

		let w = croppedCanvas.width;
		let h = croppedCanvas.height;
		let pix = {x:[], y:[]};
		let imageData = croppedCtx.getImageData(0,0,w,h);
		let index = 0;

		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				index = (y * w + x) * 4;
				if (imageData.data[index+3] > 0) {
					pix.x.push(x);
					pix.y.push(y);
				}
			}
		}

		pix.x.sort((a,b) => a-b);
		pix.y.sort((a,b) => a-b);
		let n = pix.x.length-1;

		w = pix.x[n] - pix.x[0];
		h = pix.y[n] - pix.y[0];
		var cut = croppedCtx.getImageData(pix.x[0], pix.y[0], w, h);

		croppedCanvas.width = w;
		croppedCanvas.height = h;
		croppedCtx.putImageData(cut, 0, 0);

		return croppedCanvas.toDataURL("image/svg+xml");
	}
}
