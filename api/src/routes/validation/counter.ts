import { HttpEndpointValidationRules } from '../../types';

const counterValidationRules: HttpEndpointValidationRules = {
  post: {
    key: ['string', 'required'],
    value: ['number', 'required']
  }
};

export default counterValidationRules;
