export type ProductAction = 'Added' | 'Changed' | 'Bought' | 'Created'


export type EventBase = {
  who: 'admin'; // todo: move to oauth and use id,
  when: Date;
  revision: Number;
  previousRevision: Number;
  what: ProductAction;
};

export const EventBaseSchema: {[P in keyof EventBase] : any} = {
  who: String,
  when: Date,
  revision: Number,
  previousRevision: Number,
  what: String,
}