import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { USER_API } from "./constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private titleService: Title, private http: HttpClient) {
    this.titleService.setTitle("User Management");
  }
  title = "User Management";
  users = [];
  totalCount = 0;
  ngOnInit() {
    this.http.get(USER_API).subscribe(data => this.sendToUI(data));
  }
  sendToUI(data) {
    this.totalCount = data.results.length;
    console.log(data);
    console.log(data.results.length);
    this.users = data.results;
  }
}
