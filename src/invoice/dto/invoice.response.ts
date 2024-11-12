export interface InvoiceResponse {
  ok: boolean;
  result?: InvoiceResult;
}

export interface InvoiceResult {
  invoice_id: number;
  hash: string;
  currency_type: string;
  asset: string;
  amount: string;
  pay_url: string;
  bot_invoice_url: string;
  mini_app_invoice_url: string;
  web_app_invoice_url: string;
  status: string;
  created_at: string;
  allow_comments: boolean;
  allow_anonymous: boolean;
}
