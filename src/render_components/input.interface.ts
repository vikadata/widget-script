import { View } from "@apitable/widget-sdk/dist/script/view";
import { Field } from "@apitable/widget-sdk/dist/script/field";
import { Record } from "@apitable/widget-sdk/dist/script/record";
import { Datasheet } from "@apitable/widget-sdk/dist/script/datasheet";

type SelectAsync<T> = (label: string, datasheet: Datasheet) => Promise<T>

export interface Input {
  textAsync: (label?: string) => Promise<string>;
  viewAsync: SelectAsync<View>;
  fieldAsync: SelectAsync<Field>;
  recordAsync: SelectAsync<Record>;
}