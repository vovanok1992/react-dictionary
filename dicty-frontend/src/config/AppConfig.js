/**
 * Created by Vovan on 29.12.2016.
 */

class AppConfig {
    init(config){
        this.backendServer = config.backEndUrl;
    }

    getBackendServer(){
        return this.backendServer;
    }
}

export default new AppConfig();