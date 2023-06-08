import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { UploadImageInterface } from '../../interface/UploadImageInterface';
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;
  @Input('document') document: UploadImageInterface;
  @Input('index') index: number;
  @Input("imageUploadForm") imageUploadForm: FormData;

  @Output() emitImageFile = new EventEmitter();
  public loader: boolean = false;
  constructor(private uploadocumentService: UploadImageService, private toastr: ToastrService) { }

  
  selectFiles(event: any): void {
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.emitImageFile.emit(this.selectedFiles);
    if(this.selectedFiles && this.selectedFiles[0]){
      this.imageUploadForm.append(this.document.key, this.selectedFiles[0]);
    }
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.document && changes.document.currentValue){
      if(changes.document.currentValue.imageUrl){
        this.previews.push(changes.document.currentValue.imageUrl);
      }
    }
  }
  deleteImag(){
    console.log(this.imageUploadForm.get('entity_id'), this.imageUploadForm.get('entity_type'));
    
    if(this.document.imageUrl){
      this.loader = true;
      this.uploadocumentService.deleteDdocumnts(this.imageUploadForm.get('entity_type'), this.imageUploadForm.get('entity_id'), this.document.key).subscribe(()=>{
        this.document.imageUrl = '';
        this.toastr.success('Image deleted successfully');
        this.loader = false;
        this.previews = [];
      this.selectedFileNames = [];
      },(error)=>{
        this.loader = false;
      });
    } else {
      this.previews = [];
      this.imageUploadForm.delete(this.document.key);
      this.selectedFileNames = [];
    }
  }
}
