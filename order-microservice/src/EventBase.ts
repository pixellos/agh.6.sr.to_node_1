export type OrderAction = 'Issued' | 'Sent' | 'Paid' | 'Returned'


export type EventBase = {
  who: 'admin'; // todo: move to oauth and use id,
  when: Date;
  revision: Number;
  previousRevision: Number;
  what: OrderAction;
};

export const EventBaseSchema: {[P in keyof EventBase] : any} = {
  who: String,
  when: Date,
  revision: Number,
  previousRevision: Number,
  what: String,
}