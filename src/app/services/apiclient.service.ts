import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { retry, timeout } from 'rxjs/operators';
import { Post } from '../model/post';
import { showAlertError, showToast } from '../tools/message-functions';
import { AuthService } from './auth.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class APIClientService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  apiUrl = 'http://localhost:3000';

  private intervalId: any;
  postList: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) { 
    this.startRefreshingPosts();
  }

  private startRefreshingPosts(): void {
    this.refreshPostList();
    this.intervalId = setInterval(() => {
      this.refreshPostList();
    }, 5000);
  }

  async createPost(post: Post): Promise<Post | null> {
    try {
      console.log('Creando post:', post);
      const postWithoutId = {
        title: post.title,
        body: post.body,
        author: post.author || 'Usuario',
        date: new Date().toISOString().split('T')[0],
        authorImage: post.authorImage || '/api/placeholder/100/100'
      };

      const createdPost = await lastValueFrom(
        this.http.post<Post>(`${this.apiUrl}/posts`, postWithoutId, this.httpOptions)
        .pipe(
          timeout(5000),
          retry(1)
        )
      );
      
      console.log('Post creado:', createdPost);
      await this.refreshPostList();
      showToast('Post creado correctamente');
      return createdPost;
    } catch (error) {
      console.error('Error al crear post:', error);
      showAlertError('Error al crear el post', error);
      return null;
    }
  }

  async updatePost(post: Post): Promise<Post | null> {
    try {
      const updatedPost = await lastValueFrom(
        this.http.put<Post>(`${this.apiUrl}/posts/${post.id}`, post, this.httpOptions)
        .pipe(
          timeout(5000),
          retry(1)
        )
      );
      await this.refreshPostList();
      showToast('Post actualizado correctamente');
      return updatedPost;
    } catch (error) {
      console.error('Error al actualizar post:', error);
      showAlertError('Error al actualizar el post', error);
      return null;
    }
  }

  async deletePost(id: number): Promise<boolean> {
    try {
      await lastValueFrom(
        this.http.delete(`${this.apiUrl}/posts/${id}`, this.httpOptions)
        .pipe(
          timeout(5000),
          retry(1)
        )
      );
      await this.refreshPostList();
      showToast('Post eliminado correctamente');
      return true;
    } catch (error) {
      console.error('Error al eliminar post:', error);
      showAlertError('Error al eliminar el post', error);
      return false;
    }
  }

  async refreshPostList(): Promise<void> {
    try {
      const posts = await this.fetchPosts();
      console.log('Posts obtenidos:', posts);
      this.postList.next(posts);
    } catch (error) {
      console.error('Error al refrescar posts:', error);
    }
  }

  async fetchPosts(): Promise<Post[]> {
    try {
      console.log('Obteniendo posts de:', `${this.apiUrl}/posts`);
      const posts = await lastValueFrom(
        this.http.get<Post[]>(`${this.apiUrl}/posts`)
        .pipe(
          timeout(5000),
          retry(1)
        )
      );
      return posts.sort((a, b) => Number(b.id) - Number(a.id));
    } catch (error) {
      console.error('Error al obtener posts:', error);
      return [];
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}