import { View } from "@vikadata/widget-sdk/dist/script/view";
import { Field } from "@vikadata/widget-sdk/dist/script/field";
import { Record } from "@vikadata/widget-sdk/dist/script/record";
import { Datasheet } from "@vikadata/widget-sdk/dist/script/datasheet";

export interface Input {
  textAsync: (name?: string) => Promise<string>;
  viewAsync: (name: string, datasheet: Datasheet) => Promise<View>;
  fieldAsync: (name: string, datasheet: Datasheet) => Promise<Field>;
  recordAsync: (name: string, datasheet: Datasheet) => Promise<Record>;
}