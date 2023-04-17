import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private fireStore: AngularFirestore) {}
  loadFeatured() {
    return (
      this.fireStore
        // pour Afficher seulement le featured post c'est type de filtrage
        .collection(
          'posts',
          (ref) => ref.where('isFeatured', '==', true).limit(4) // pour afficher seulement 4
        )
        .snapshotChanges()
        .pipe(
          map((actions) => {
            return actions.map((a) => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, data };
            });
          })
        )
    );
  }
  loadLates() {
    return (
      this.fireStore
        // pour Afficher seulement le featured post c'est type de filtrage
        .collection('posts', (ref) => ref.orderBy('cratedAt'))
        .snapshotChanges()
        .pipe(
          map((actions) => {
            return actions.map((a) => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, data };
            });
          })
        )
    );
  }
  getCategoriePost(categorieId: string): Observable<any[]> {
    return this.fireStore
      .collection('posts', (ref) =>
        ref.where('categorie.categorieId', '==', categorieId).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
}
////categorie.categorieId', '==', categorieId
