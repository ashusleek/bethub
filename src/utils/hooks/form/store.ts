export class Store {
  public hooksContainerMounted: boolean;
  public hooksContainerRendered: boolean;
  public hooksContainerMountedAutomatically: boolean;

  public mountQueue: any;
  public mountIntoContainerDefault: any;
  public mountIntoContainer: any;

  formHooks: any;
  forms: any;

  constructor() {
    this.hooksContainerMounted = false;
    this.hooksContainerRendered = false;
    this.hooksContainerMountedAutomatically = false;
    this.formHooks = [];
    this.forms = [];

    this.mountQueue = [];
    this.mountIntoContainerDefault = (item: any) => {
      this.mountQueue.push(item);
    };
    this.mountIntoContainer = this.mountIntoContainerDefault;
  }

  public addHook = (formName: string, hook: any) => {
    this.formHooks[formName] = hook;
  };

  public getHook = (formName: string) => {
    return this.formHooks[formName];
  };

  public addForm = (formName: string, ref: any) => {
    this.forms[formName] = ref;
  };

  public getForm = (formName: any) => {
    return this.forms[formName];
  };

  public removeForm = (formName: any) => {
    delete this.forms[formName];
    delete this.formHooks[formName];
  };

  public reset = () => {
    this.formHooks = [];
    this.forms = [];
  };
}

export default new Store();
