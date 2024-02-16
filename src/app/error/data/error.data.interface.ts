import {DataInterface} from "../../../utils/router/data.interface";

export interface ErrorDataInterface extends  Omit<DataInterface, 'List' | 'Destroy' | 'Retrieve' | 'Update'>{

}
