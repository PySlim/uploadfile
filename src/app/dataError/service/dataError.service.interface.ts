import {ServiceInterface} from "../../../utils/router/services.interface";

export interface DataErrorServiceInterface extends  Omit<ServiceInterface, 'List' | 'Create' |'Destroy' | 'Retrieve'>{

}
