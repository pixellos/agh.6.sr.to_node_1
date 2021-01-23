export type OrderAction = 'Issued' | 'AddressSet' | 'Sent' | 'Paid' | 'Returned' | 'RefundRequested' | 'Refunded'

export type EventBase = {
  who: string;
  when: Date;
  revision: Number;
  previousRevision: Number;
  what: string
  //what: 'Issued' | 'Sent' | 'Paid' | 'Returned';
};

export const EventBaseSchema: {[P in keyof EventBase] : any} = {
  who: String,
  when: Date,
  revision: Number,
  previousRevision: Number,
  what: String,
}