import {ControllerInterface} from "../../../utils/router/controllers.interface";

export interface DataErrorControllerInterface extends Omit<ControllerInterface, 'Create' | 'Destroy' | 'List' | 'Retrieve'>{

}
