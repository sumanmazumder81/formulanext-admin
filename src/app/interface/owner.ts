export interface OwnerInterface {
    businessName?: string;
    userEntityId?: number;
    userEntity?: {
        id?: number;
        fullName?: string;
        pan?: string;
        aadhaar?: string;
        isCompany?: true;
        contact?: string;
        company?: string;
        address?: string;
        media?: string;
        document?: string;
        bankDetail?: string;
        createdBy: string;
        updatedBy?: string;
        meta?: string;
        notes?: string;
        isActive?: boolean;
        tags? : any[]
    }
    media?: string;
    meta?: string;
    notes?: string;
    isActive?: boolean;
    tags?: any[]
}
