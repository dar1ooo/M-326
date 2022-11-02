import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserRole } from 'src/app/enums/user-role';
import { UserLogin } from 'src/app/models/user-login.model';
import { UserSignup } from 'src/app/models/user-signup.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public userLogin: UserLogin = new UserLogin();
  public userSignup: UserSignup = new UserSignup();
  private user: User = new User();

  private mockedUser: User = new User();

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.changeForm();
    this.mockedUser.Username = 'Alfred';
    this.mockedUser.Email = 'alfredhitchcock@online.gibz.ch';
    this.mockedUser.UserRole = UserRole.Admin;
    this.mockedUser.UserId = 1;
    this.mockedUser.SkillGroup = [
      {
        SkillTopic: 'English',
        Skills: [
          {
            SubSkills: [
              {
                Description: 'Grammar',
                IsChecked: false,
                ShowPdf: true,
                PdfUrl: 'https://www.orimi.com/pdf-test.pdf',
                ShowVideo: true,
                VideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              },
              {
                Description: 'Writing',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: false,
                ShowPdf: true,
                PdfUrl: 'https://www.orimi.com/pdf-test.pdf',
                ShowVideo: true,
                VideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              },
              {
                Description: 'Basic listening',
                IsChecked: false,
                ShowPdf: true,
                PdfUrl: 'https://www.orimi.com/pdf-test.pdf',
                ShowVideo: true,
                VideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              },
            ],
          },
          {
            SubSkills: [
              {
                Description: 'Listening',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Read at least 3 books in english',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SubSkills: [
              {
                Description: 'Essays',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
        ],
      },
    ];
    sessionStorage.setItem('user', JSON.stringify(this.mockedUser));
  }

  public login(): void {
    this.userService.loginUser(this.userLogin).subscribe(
      (result) => {
        this.user = result;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        window.location.href = '/dashboard';
      },
      (error) => {
        this.toastr.error('Please check your credentials', 'Login failed');
      }
    );
  }
  public signup(): void {
    this.userService.registerUser(this.userSignup).subscribe(
      (result) => {
        this.user = result;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        window.location.href = '/dashboard';
      },
      (error) => {
        this.toastr.error(
          'Please check your credentials',
          'Registration failed'
        );
      }
    );
  }

  public changeForm() {
    let switchCtn = document.querySelector('#switch-cnt');
    let switchC1 = document.querySelector('#switch-c1');
    let switchC2 = document.querySelector('#switch-c2');
    let switchCircle = document.querySelectorAll('.switch__circle');
    let aContainer = document.querySelector('#a-container');
    let bContainer = document.querySelector('#b-container');

    switchCtn?.classList.add('is-gx');
    setTimeout(function () {
      switchCtn?.classList.remove('is-gx');
    }, 1500);

    switchCtn?.classList.toggle('is-txr');
    switchCircle[0].classList.toggle('is-txr');
    switchCircle[1].classList.toggle('is-txr');

    switchC1?.classList.toggle('is-hidden');
    switchC2?.classList.toggle('is-hidden');
    aContainer?.classList.toggle('is-txl');
    bContainer?.classList.toggle('is-txl');
    bContainer?.classList.toggle('is-z200');
  }
}
