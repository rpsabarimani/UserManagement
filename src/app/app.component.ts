import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { USER_API } from "./constants";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private http: HttpClient,
    private modalService: NgbModal
  ) {
    this.titleService.setTitle("User Management");
  }
  title = "User Management";
  users = [];
  totalCount = 0;
  formdata;
  ngOnInit() {
    this.http.get(USER_API).subscribe(data => this.sendToUI(data));
  }
  sendToUI(data) {
    this.totalCount = data.results.length;
    console.log(data);
    console.log(data.results.length);
    this.users = data.results;
  }

  onEdit(id, content) {
    this.http
      .get(USER_API + "/" + id)
      .subscribe(data => this.sendToForm(data, content));
  }

  sendToForm(data, content) {
    let errCode = data.error.errCode;
    if (errCode == 0) {
      this.formdata = new FormGroup({
        email: new FormControl("angular@gmail.com"),
        mobile: new FormControl("abcd1234")
      });
      this.modelTitle = "Edit User";
      this.userData = data.results[0];
      console.log(this.userData);
      this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    }
  }

  onDelete() {
    alert("Deleted Successfully");
  }

  modelTitle: string;
  userEmptyData = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: ""
  };
  userData = this.userEmptyData;
  addUser = content => {
    this.clearUserForm();
    this.modelTitle = "Add User";
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  };

  clearUserForm = () => {
    this.userData = this.userEmptyData;
  };

  addEditUserAction(data) {
    console.log(data);
    var newUserObj = [];
    this.users.forEach(function(vl) {
      if (vl.id === data.id) newUserObj.push(data);
      else newUserObj.push(vl);
    });
    this.users = newUserObj;
    this.modalService.dismissAll();
  }
}
