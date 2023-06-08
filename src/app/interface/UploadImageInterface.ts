import { vendorEntityType } from 'src/app/enums/vendorsEntity.enum';

export interface UploadImageInterface {
    label?: string;
    key?:string;
    imageUrl?: string;
    entityType?: vendorEntityType[],
}
