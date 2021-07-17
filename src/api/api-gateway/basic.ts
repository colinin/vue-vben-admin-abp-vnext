import { defAbpHttp } from '/@/utils/http/abp';
import { LoadBalancerDescriptor } from './model/basicModel';
import { ListResultDto } from '../model/baseModel';

enum Api {
  GetLoadBalancerProviders = '/api/ApiGateway/Basic/LoadBalancers',
}

export const getLoadBalancerProviders = () => {
  return defAbpHttp.get<ListResultDto<LoadBalancerDescriptor>>({
    url: Api.GetLoadBalancerProviders,
  });
};
