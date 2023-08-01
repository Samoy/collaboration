import type { IApi } from '@umijs/max';

export default (api: IApi) => {
  api.addBeforeMiddlewares(() => {
    return function cors(req, res, next) {
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      next();
    };
  });
};
