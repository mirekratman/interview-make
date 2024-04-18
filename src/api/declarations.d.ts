declare module '@make/shared';

declare module 'express' {
    interface MutlerRequest extends Request {
        files?: File[];
    }
}
