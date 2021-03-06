import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ClienteService } from './../../services/clientes.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimeoutDebouncer } from 'ionic-angular/umd/util/debouncer';

/**
 * Generated class for the MedicamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicamentos',
  templateUrl: 'medicamentos.html',
})
export class MedicamentosPage {
  cliente: any = {};
  medicamentos: any = []; // MEDICAMENTOS
  ref: AngularFireStorageReference;    
  downloadURL: Observable<string>;
  image: string; // base64
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private storage: AngularFireStorage,      
    public crearClienteServices: ClienteService) {
    this.cliente = navParams.get('cliente');
  }

  boolContador: boolean = true;
  contadorMedicamentos: number = 0;
  agregarMedicamento() {
    console.log("agregado")
    this.copyArray();  
    this.boolContador = false;
    this.contadorMedicamentos++;
    var nuevoMedicamento: any = {};
    nuevoMedicamento.contador = this.contadorMedicamentos;
    this.medicamentos.push(nuevoMedicamento);        
  }

  copyArray() {    
    for (var i = 0; i < this.medicamentos.length; ++i)
    this.cliente.medicamentos[i] = this.medicamentos[i];    
  }

  async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    return await this.camera.getPicture(options)
  }

  createUploadTask(file: string, path: string, i: number) {
    const filePath = `${path}`;
    this.ref = this.storage.ref(filePath);
    this.image = 'data:image/jpg;base64,' + file;
    alert("Cargando foto en la base de datos");
    this.ref.putString(this.image, 'data_url').then(() => {      
      this.ref.getDownloadURL().subscribe(url => {                
        this.downloadURL = url;
        this.cliente.medicamentos[i].fotoMedicamento = this.downloadURL;
        alert("Foto cargada con éxito en la base de datos")        
      })
    }); 
  }  

  async uploadHandler(i: number) {
   const base64 = await this.takePhoto();
   const pathFotoUsuario: string = `usuarios/${this.cliente.id}/medicamentos/fotoMedicamento.jpg`;
   this.createUploadTask(base64, pathFotoUsuario, i);      
  }
  createUploadTask2(file: string, path: string) {
    const filePath = `${path}`;
    this.ref = this.storage.ref(filePath);
    this.image = 'data:image/jpg;base64,' + file;
    alert("Cargando foto en la base de datos");
    this.ref.putString(this.image, 'data_url').then(() => {      
      this.ref.getDownloadURL().subscribe(url => {                
        this.downloadURL = url;
        this.cliente.medicamentos.fotoMedicamento2 = this.downloadURL;
        alert("Foto cargada con éxito en la base de datos")        
      })
    }); 
  }  

  async uploadHandler2() {
   const base64 = await this.takePhoto();
   const pathFotoUsuario: string = `usuarios/${this.cliente.id}/medicamentos/fotoMedicamento2.jpg`;
   this.createUploadTask2(base64, pathFotoUsuario);      
  }

  createUploadTask3(file: string, path: string) {
    const filePath = `${path}`;
    this.ref = this.storage.ref(filePath);
    this.image = 'data:image/jpg;base64,' + file;
    alert("Cargando foto en la base de datos");
    this.ref.putString(this.image, 'data_url').then(() => {      
      this.ref.getDownloadURL().subscribe(url => {                
        this.downloadURL = url;
        this.cliente.medicamentos.fotoMedicamento3 = this.downloadURL;
        alert("Foto cargada con éxito en la base de datos")        
      })
    }); 
  }  

  async uploadHandler3() {
   const base64 = await this.takePhoto();
   const pathFotoUsuario: string = `usuarios/${this.cliente.id}/medicamentos/fotoMedicamento3.jpg`;
   this.createUploadTask3(base64, pathFotoUsuario);      
  }

  createUploadTask4(file: string, path: string) {
    const filePath = `${path}`;
    this.ref = this.storage.ref(filePath);
    this.image = 'data:image/jpg;base64,' + file;
    alert("Cargando foto en la base de datos");
    this.ref.putString(this.image, 'data_url').then(() => {      
      this.ref.getDownloadURL().subscribe(url => {                
        this.downloadURL = url;
        this.cliente.medicamentos.fotoMedicamento4 = this.downloadURL;
        alert("Foto cargada con éxito en la base de datos")        
      })
    }); 
  }  

  async uploadHandler4() {
   const base64 = await this.takePhoto();
   const pathFotoUsuario: string = `usuarios/${this.cliente.id}/medicamentos/fotoMedicamento4.jpg`;
   this.createUploadTask4(base64, pathFotoUsuario);      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicamentosPage');
  }
  guardarClienteVolverHome() { 
    this.copyArray();      
    if(!this.cliente.id) {
      this.cliente.id = Date.now();        
    }        
    this.crearClienteServices.createCliente(this.cliente);    
    this.navCtrl.popToRoot();
    console.log(this.cliente);    
  }
}
