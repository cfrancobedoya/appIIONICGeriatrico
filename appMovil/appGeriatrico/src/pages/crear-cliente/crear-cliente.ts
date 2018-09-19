import { ClienteService } from '../../services/clientes.service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CrearClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-cliente',
  templateUrl: 'crear-cliente.html',
})
export class CrearClientePage {
  cliente: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public crearClienteServices: ClienteService) {
      this.cliente = navParams.get('cliente') || {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearClientePage');
  }
  guardarCliente() {
    if(!this.cliente.id) {
      this.cliente.id = Date.now();
    }    
    this.crearClienteServices.createCliente(this.cliente);
    this.navCtrl.pop();
    console.log(this.cliente);    
  }

}