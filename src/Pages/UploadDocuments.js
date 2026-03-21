import React, { useState, useRef } from 'react';
import {
  FiUpload, FiFile, FiX, FiCheck, FiAlertCircle,
  FiFolder, FiImage, FiVideo, FiMusic, FiArchive,
  FiFileText, FiCloud, FiUser, FiSettings
} from 'react-icons/fi';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');
  :root {
    --t50:#f0fdfa;--t100:#ccfbf1;--t200:#99f6e4;--t300:#5eead4;--t400:#2dd4bf;
    --t500:#14b8a6;--t600:#0d9488;--t700:#0f766e;--t800:#115e59;
    --s400:#94a3b8;--s500:#64748b;--s600:#475569;--s700:#334155;--s800:#1e293b;
    --sur:#fff;--sur2:#f8fffe;
    --rsm:8px;--rmd:14px;--rlg:20px;
    --shmd:0 4px 16px rgba(13,148,136,.10),0 2px 6px rgba(13,148,136,.06);
    --shlg:0 10px 40px rgba(13,148,136,.14),0 4px 12px rgba(13,148,136,.08);
    --glow:0 0 0 3px rgba(20,184,166,.16);
  }
  *{box-sizing:border-box;}
  .ud-root{font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;}
  .ud-root::before{content:'';position:fixed;top:-180px;right:-180px;width:540px;height:540px;
    background:radial-gradient(circle,rgba(20,184,166,.09) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .ud-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:460px;height:460px;
    background:radial-gradient(circle,rgba(13,148,136,.07) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .ud-inner{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:20px 14px 64px;}
  @media(min-width:480px){.ud-inner{padding:24px 18px 64px;}}
  @media(min-width:640px){.ud-inner{padding:32px 24px 72px;}}
  @media(min-width:1024px){.ud-inner{padding:40px 40px 80px;}}

  /* Header */
  .ud-header{text-align:center;margin-bottom:28px;}
  .ud-title{font-family:'Syne',sans-serif;font-size:clamp(20px,4vw,30px);font-weight:800;
    color:var(--t800);letter-spacing:-.5px;
    display:inline-flex;align-items:center;gap:10px;margin:0 0 5px;}
  .ud-ticon{width:38px;height:38px;background:linear-gradient(135deg,var(--t400),var(--t600));
    border-radius:11px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;
    box-shadow:0 4px 14px rgba(13,148,136,.30);flex-shrink:0;}
  .ud-sub{font-size:13px;color:var(--s500);margin:0;}

  /* Main grid */
  .main-grid{display:grid;grid-template-columns:1fr;gap:18px;}
  @media(min-width:1024px){.main-grid{grid-template-columns:1fr 280px;gap:22px;align-items:start;}}

  /* Sidebar */
  .sidebar{display:grid;grid-template-columns:1fr;gap:14px;}
  @media(min-width:560px) and (max-width:1023px){.sidebar{grid-template-columns:1fr 1fr;gap:16px;}}
  @media(min-width:1024px){.sidebar{display:flex;flex-direction:column;gap:16px;}}

  /* Drop zone */
  .drop-zone{border:2px dashed var(--t200);border-radius:var(--rlg);
    padding:32px 20px;text-align:center;background:var(--sur);
    cursor:pointer;transition:all .25s;position:relative;overflow:hidden;}
  @media(min-width:480px){.drop-zone{padding:40px 24px;}}
  .drop-zone:hover,.drop-zone.active{border-color:var(--t500);background:var(--t50);
    box-shadow:var(--glow);}
  .drop-zone.active{border-style:solid;}
  .drop-icon{font-size:36px;color:var(--t300);margin-bottom:14px;display:block;}
  @media(min-width:480px){.drop-icon{font-size:44px;}}
  .drop-title{font-family:'Syne',sans-serif;font-size:clamp(15px,2.5vw,18px);
    font-weight:700;color:var(--t800);margin:0 0 6px;}
  .drop-sub{font-size:13px;color:var(--s500);margin:0 0 18px;}
  .btn-browse{display:inline-flex;align-items:center;gap:7px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:11px 22px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 4px 14px rgba(13,148,136,.28);}
  .btn-browse:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(13,148,136,.38);}
  .drop-hint{font-size:11px;color:var(--s400);margin-top:14px;line-height:1.5;}

  /* File list card */
  .file-list-card{background:var(--sur);border-radius:var(--rlg);
    box-shadow:var(--shmd);border:1px solid rgba(20,184,166,.10);
    padding:18px;margin-top:14px;}
  @media(min-width:480px){.file-list-card{padding:20px 22px;}}
  .file-list-hdr{display:flex;align-items:center;justify-content:space-between;
    margin-bottom:16px;flex-wrap:wrap;gap:10px;}
  .file-list-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:var(--t800);margin:0;}
  .btn-upload{display:inline-flex;align-items:center;gap:6px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:9px 16px;
    font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 3px 10px rgba(13,148,136,.25);}
  .btn-upload:hover{background:linear-gradient(135deg,var(--t400),var(--t500));}
  .btn-upload:disabled{opacity:.5;cursor:not-allowed;transform:none;}

  .file-item{display:flex;align-items:center;gap:10px;padding:12px;
    background:var(--t50);border-radius:var(--rmd);border:1px solid var(--t100);
    margin-bottom:8px;transition:background .15s;}
  .file-item:last-child{margin-bottom:0;}
  .file-item:hover{background:var(--t100);}
  .file-icon-wrap{width:34px;height:34px;background:var(--sur);border-radius:8px;
    display:flex;align-items:center;justify-content:center;font-size:15px;
    box-shadow:var(--shmd);flex-shrink:0;}
  .file-info{flex:1;min-width:0;}
  .file-name{font-size:12px;font-weight:700;color:var(--s800);
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px;}
  .file-size{font-size:10px;color:var(--s500);}
  .file-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}
  .prog-mini{width:60px;}
  @media(min-width:480px){.prog-mini{width:80px;}}
  .prog-track-mini{width:100%;height:5px;background:var(--sur2);border-radius:3px;overflow:hidden;margin-bottom:2px;}
  .prog-fill-mini{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--t400),var(--t600));transition:width .3s;}
  .prog-pct{font-size:9px;color:var(--s500);text-align:center;}
  .status-icon{width:20px;display:flex;align-items:center;justify-content:center;}
  .spinner{width:16px;height:16px;border:2px solid var(--t100);
    border-top-color:var(--t500);border-radius:50%;animation:spin .7s linear infinite;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .btn-remove{background:none;border:none;cursor:pointer;color:var(--s400);
    font-size:14px;padding:3px;border-radius:5px;display:flex;align-items:center;transition:all .15s;}
  .btn-remove:hover{color:#dc2626;background:#fef2f2;}

  /* Sidebar cards */
  .card{background:var(--sur);border-radius:var(--rlg);
    box-shadow:var(--shmd);border:1px solid rgba(20,184,166,.10);}
  .cp{padding:16px;}
  @media(min-width:480px){.cp{padding:18px 20px;}}
  .card-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;
    color:var(--t800);display:flex;align-items:center;gap:7px;margin:0 0 12px;}
  .cticon{width:24px;height:24px;border-radius:6px;
    background:linear-gradient(135deg,var(--t100),var(--t200));
    display:flex;align-items:center;justify-content:center;color:var(--t600);font-size:11px;}
  .stat-row{display:flex;align-items:center;justify-content:space-between;
    padding:6px 0;border-bottom:1px solid var(--t50);}
  .stat-row:last-child{border-bottom:none;}
  .sr-key{font-size:12px;color:var(--s500);}
  .sr-val{font-size:13px;font-weight:700;color:var(--s700);}

  /* Storage panel */
  .storage-panel{border-radius:var(--rlg);
    background:linear-gradient(135deg,var(--t600),var(--t800));
    padding:16px;color:#fff;position:relative;overflow:hidden;
    box-shadow:0 6px 24px rgba(13,148,136,.30);}
  @media(min-width:480px){.storage-panel{padding:18px 20px;}}
  .storage-panel::before{content:'';position:absolute;top:-30px;right:-30px;
    width:110px;height:110px;background:rgba(255,255,255,.07);border-radius:50%;}
  .sp-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;
    margin:0 0 12px;position:relative;z-index:1;}
  .sp-row{display:flex;align-items:center;justify-content:space-between;
    padding:5px 0;border-bottom:1px solid rgba(255,255,255,.12);
    font-size:12px;position:relative;z-index:1;}
  .sp-row:last-child{border-bottom:none;}
  .sp-key{color:rgba(255,255,255,.75);}
  .sp-val{font-weight:700;color:#fff;}

  /* Quick actions */
  .qa-btn{display:flex;align-items:center;gap:8px;width:100%;padding:9px 10px;
    border:none;background:none;cursor:pointer;border-radius:var(--rsm);
    font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;
    color:var(--t600);text-align:left;transition:all .15s;margin-bottom:3px;}
  .qa-btn:last-child{margin-bottom:0;}
  .qa-btn:hover{background:var(--t50);color:var(--t700);}
  .qa-icon{font-size:14px;flex-shrink:0;}

  /* Tips */
  .tips-card{background:linear-gradient(135deg,#fffbeb,#fef3c7);
    border:1.5px solid #fde68a;border-radius:var(--rlg);padding:16px;}
  @media(min-width:480px){.tips-card{padding:18px 20px;}}
  .tips-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;
    color:#92400e;margin:0 0 10px;}
  .tips-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;}
  .tips-item{font-size:12px;color:#b45309;display:flex;align-items:flex-start;gap:6px;line-height:1.4;}
  .tip-dot{width:5px;height:5px;border-radius:50%;background:#d97706;margin-top:5px;flex-shrink:0;}
`;

const fileTypes = {
  image:['jpg','jpeg','png','gif','bmp','webp'],
  document:['pdf','doc','docx','txt','rtf'],
  spreadsheet:['xls','xlsx','csv'],
  video:['mp4','avi','mov','wmv'],
  audio:['mp3','wav','aac'],
  archive:['zip','rar','7z','tar'],
};

const getFileIcon = file => {
  const ext = file.name.split('.').pop().toLowerCase();
  if (fileTypes.image.includes(ext))       return <FiImage    style={{color:'#8b5cf6'}}/>;
  if (fileTypes.document.includes(ext))    return <FiFileText style={{color:'#06b6d4'}}/>;
  if (fileTypes.spreadsheet.includes(ext)) return <FiFileText style={{color:'#22c55e'}}/>;
  if (fileTypes.video.includes(ext))       return <FiVideo    style={{color:'#6366f1'}}/>;
  if (fileTypes.audio.includes(ext))       return <FiMusic    style={{color:'#ec4899'}}/>;
  if (fileTypes.archive.includes(ext))     return <FiArchive  style={{color:'#f59e0b'}}/>;
  return <FiFile style={{color:'var(--s400)'}}/>;
};

const fmtSize = b => {
  if (!b) return '0 B';
  const k=1024, s=['B','KB','MB','GB'], i=Math.floor(Math.log(b)/Math.log(k));
  return parseFloat((b/Math.pow(k,i)).toFixed(1))+' '+s[i];
};

const UploadDocuments = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = e => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(e.type==='dragenter'||e.type==='dragover');
  };

  const handleDrop = e => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files?.[0]) addFiles(e.dataTransfer.files);
  };

  const addFiles = fileList => {
    const newFiles = Array.from(fileList).map(f=>({
      id:Math.random().toString(36).substr(2,9), file:f, name:f.name,
      size:f.size, status:'pending', progress:0
    }));
    setFiles(p=>[...p,...newFiles]);
  };

  const removeFile = id => setFiles(p=>p.filter(f=>f.id!==id));

  const simulateUpload = id => {
    setProgress(p=>({...p,[id]:0}));
    const iv = setInterval(()=>{
      setProgress(p=>{
        const next = (p[id]||0) + Math.random()*15;
        if (next>=100){
          clearInterval(iv);
          setFiles(f=>f.map(x=>x.id===id?{...x,status:'completed'}:x));
          return {...p,[id]:100};
        }
        return {...p,[id]:next};
      });
    },180);
  };

  const startUpload = () => {
    setUploading(true);
    files.filter(f=>f.status==='pending').forEach(f=>simulateUpload(f.id));
    setTimeout(()=>{setUploading(false);},3500);
  };

  const totalSize = files.reduce((a,f)=>a+f.size,0);

  return (
    <div className="ud-root">
      <style>{style}</style>
      <div className="ud-inner">

        {/* Header */}
        <div className="ud-header">
          <h1 className="ud-title"><span className="ud-ticon"><FiUpload/></span>Upload Documents</h1>
          <p className="ud-sub">Upload your files to secure cloud storage</p>
        </div>

        <div className="main-grid">
          <div>
            {/* Drop Zone */}
            <div
              className={`drop-zone${dragActive?' active':''}`}
              onDragEnter={handleDrag} onDragLeave={handleDrag}
              onDragOver={handleDrag} onDrop={handleDrop}
              onClick={()=>inputRef.current?.click()}
            >
              <FiUpload className="drop-icon"/>
              <p className="drop-title">Drag & Drop Files Here</p>
              <p className="drop-sub">or click anywhere to browse your computer</p>
              <input ref={inputRef} type="file" multiple className="hidden"
                style={{display:'none'}} onChange={e=>e.target.files?.[0]&&addFiles(e.target.files)}/>
              <button className="btn-browse" onClick={e=>{e.stopPropagation();inputRef.current?.click();}}>
                <FiUpload style={{fontSize:13}}/>Browse Files
              </button>
              <p className="drop-hint">PDF · DOC · XLS · PPT · JPG · PNG · MP4 · ZIP — Max 100 MB per file</p>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="file-list-card">
                <div className="file-list-hdr">
                  <h3 className="file-list-title">Files to Upload ({files.length})</h3>
                  <button className="btn-upload" onClick={startUpload} disabled={uploading}>
                    <FiUpload style={{fontSize:12}}/>{uploading?'Uploading…':'Start Upload'}
                  </button>
                </div>
                {files.map(f=>(
                  <div key={f.id} className="file-item">
                    <div className="file-icon-wrap">{getFileIcon(f)}</div>
                    <div className="file-info">
                      <div className="file-name">{f.name}</div>
                      <div className="file-size">{fmtSize(f.size)}</div>
                    </div>
                    <div className="file-right">
                      <div className="prog-mini">
                        <div className="prog-track-mini">
                          <div className="prog-fill-mini" style={{width:`${progress[f.id]||0}%`}}/>
                        </div>
                        <div className="prog-pct">{Math.round(progress[f.id]||0)}%</div>
                      </div>
                      <div className="status-icon">
                        {f.status==='completed'
                          ? <FiCheck style={{color:'#22c55e',fontSize:14}}/>
                          : f.status==='uploading'
                          ? <div className="spinner"/>
                          : <FiFile style={{color:'var(--s400)',fontSize:14}}/>
                        }
                      </div>
                      <button className="btn-remove" onClick={()=>removeFile(f.id)}><FiX/></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="sidebar">

            {/* Upload Stats */}
            <div className="card cp">
              <h3 className="card-title"><span className="cticon"><FiCloud/></span>Upload Stats</h3>
              <div className="stat-row"><span className="sr-key">Total Files</span><span className="sr-val">{files.length}</span></div>
              <div className="stat-row"><span className="sr-key">Total Size</span><span className="sr-val">{fmtSize(totalSize)}</span></div>
              <div className="stat-row"><span className="sr-key">Completed</span><span className="sr-val" style={{color:'#16a34a'}}>{files.filter(f=>f.status==='completed').length}</span></div>
              <div className="stat-row"><span className="sr-key">Pending</span><span className="sr-val" style={{color:'var(--t600)'}}>{files.filter(f=>f.status==='pending').length}</span></div>
            </div>

            {/* Storage Info */}
            <div className="storage-panel">
              <p className="sp-title">Storage Information</p>
              {[
                {k:'Available Space', v:'54.8 GB'},
                {k:'Max File Size',   v:'100 MB'},
                {k:'Supported Types', v:'All Formats'},
              ].map((r,i)=>(
                <div key={i} className="sp-row">
                  <span className="sp-key">{r.k}</span>
                  <span className="sp-val">{r.v}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="card cp">
              <h3 className="card-title"><span className="cticon"><FiFolder/></span>Quick Actions</h3>
              {[
                {icon:<FiFolder className="qa-icon"/>,  label:'Create New Folder'},
                {icon:<FiUser   className="qa-icon"/>,  label:'Share with Team'},
                {icon:<FiSettings className="qa-icon"/>,label:'Upload Settings'},
              ].map((a,i)=>(
                <button key={i} className="qa-btn">{a.icon}{a.label}</button>
              ))}
            </div>

            {/* Tips */}
            <div className="tips-card">
              <p className="tips-title">💡 Upload Tips</p>
              <ul className="tips-list">
                {[
                  'Use descriptive file names',
                  'Compress large files before uploading',
                  'Organise files in folders',
                  'Check file formats before upload',
                ].map((t,i)=>(
                  <li key={i} className="tips-item"><div className="tip-dot"/>{t}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;