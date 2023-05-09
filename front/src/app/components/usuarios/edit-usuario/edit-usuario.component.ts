import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent implements OnInit {

  public cliente: any = {};
  public id: any;

  constructor(private _route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this._route.params.subscribe(params => {
      this.id = params['id'];      
    });
    console.log(this.id);    
  }

}
