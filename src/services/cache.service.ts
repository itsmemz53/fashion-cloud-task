class CacheService {

    public create(body: any) {
        return {};
    }
    
    public async get(key: string) {
        return key;
    }

    public getAll(): string[] {
        return [];
    }

    public keys(): string[] {
        return [];
    }

    public update(params: any) {
        return {};
    }

    public async remove(key: string) {
        return true;
    }

    public async removeAll() {
        return true;
    }

}

export default new CacheService();
