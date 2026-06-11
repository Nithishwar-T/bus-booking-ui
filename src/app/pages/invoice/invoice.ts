import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { InvoiceService } from '../../services/invoice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice.html',
  styleUrl: './invoice.css'
})
export class InvoicePage implements OnInit {

  invoice: any;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {

    const bookingId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.invoiceService
      .getInvoice(bookingId)
      .subscribe({

        next: (data:any) => {

          this.invoice = data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  downloadPdf() {

  const data =
    document.getElementById('invoice-content');

  if (!data) return;

  html2canvas(data).then(canvas => {

    const imgWidth = 208;

    const pageHeight = 295;

    const imgHeight =
      canvas.height * imgWidth /
      canvas.width;

    const pdf =
      new jsPDF('p', 'mm', 'a4');

    const imgData =
      canvas.toDataURL('image/png');

    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      imgWidth,
      imgHeight
    );

    pdf.save(
      `ticket-${this.invoice.bookingReference}.pdf`
    );

  });

}

}