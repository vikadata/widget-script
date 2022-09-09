import { View } from "@vikadata/widget-sdk/dist/script/view";
import { Field } from "@vikadata/widget-sdk/dist/script/field";
import { Record } from "@vikadata/widget-sdk/dist/script/record";
import { Datasheet } from "@vikadata/widget-sdk/dist/script/datasheet";

export interface Input {
  textAsync: (label?: string) => Promise<string>;
  viewAsync: (label: string, datasheet: Datasheet) => Promise<View>;
  fieldAsync: (label: string, datasheet: Datasheet) => Promise<Field>;
  recordAsync: (label: string, datasheet: Datasheet) => Promise<Record>;
}