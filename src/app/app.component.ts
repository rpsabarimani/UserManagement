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
      this.modelTitle = "Edit User";
      this.userData = data.results[0];
      this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    }
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

    this.http
      .post(USER_API, data)
      .subscribe(resultData => this.addEditUserCallback(resultData));
  }

  addEditUserCallback(resultData) {
    console.log(resultData);
    let errCode = resultData.error.errCode,
      errMsg = resultData.error.errMsg;
    if (errCode === 0) {
      let data = resultData.results;
      if (this.users.find(v => v.id == data.id)) {
        var newUserObj = [];
        this.users.forEach(function(vl) {
          if (vl.id === data.id) newUserObj.push(data);
          else newUserObj.push(vl);
        });
        this.users = newUserObj;
      } else {
        this.users.push(data);
      }
      alert(errMsg);
      this.modalService.dismissAll();
    } else {
      alert(errMsg);
    }
  }

  deleteUserId = "";
  onDelete(id, deleteConfirmModel) {
    this.deleteUserId = id;
    this.modalService.open(deleteConfirmModel, {
      ariaLabelledBy: "modal-basic-title"
    });
  }

  deleteUser() {
    this.http
      .delete(USER_API + "/" + this.deleteUserId)
      .subscribe(data => this.deleteUserCallback(data));
  }

  deleteUserCallback(data) {
    var errCode = data.error.errCode,
      errMsg = data.error.errMsg;
    alert(errMsg);
    if (errCode === 0) {
      this.users.forEach((val, index) => {
        if (this.deleteUserId == val.id) this.users.splice(index, 1);
      });
    }
    this.deleteUserId = "";
    this.modalService.dismissAll();
  }
}
