import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private titleService: Title, private http: HttpClient) {
    this.titleService.setTitle("Onboarding Dashboard");
  }
  title = "Onboarding Dashboard";
  users = [];
  ngOnInit() {
    this.http
      .get("http://127.0.0.1:3000/users")
      .subscribe(data => this.sendToUI(data[0]));
  }
  sendToUI(data) {
    console.log(data);
    console.log(data.results);
    this.users = data.results;
  }
}
