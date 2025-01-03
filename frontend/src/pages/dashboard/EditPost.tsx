import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

interface FilePickerCallback {
  (url: string, meta?: { alt: string; text: string; title: string }): void;
}

interface FilePickerMeta {
  filetype: string;
  title: string;
}

interface UploadedFile {
  name: string;
  url: string;
}

enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem 2rem;
`;

const GoBackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: rgba(159, 0, 255, 0.1);
  border: 1px solid #9F00FF;
  border-radius: 4px;
  color: #9F00FF;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
  margin-bottom: 1rem;

  &:hover {
    background: rgba(159, 0, 255, 0.2);
    box-shadow: 0 0 10px rgba(159, 0, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const EditorCard = styled.div`
  background: rgba(13, 13, 13, 0.8);
  border: 1px solid rgba(128, 0, 255, 0.3);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(128, 0, 255, 0.1);
`;

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  color: #9F00FF;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(159, 0, 255, 0.5);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  background: rgba(13, 13, 13, 0.6);
  border: 1px solid rgba(159, 0, 255, 0.2);
  padding: 1rem;
  border-radius: 8px;
  color: #fff;
  font-family: 'Roboto Mono', monospace;

  &:focus {
    outline: none;
    border-color: #9F00FF;
    box-shadow: 0 0 10px rgba(159, 0, 255, 0.2);
  }
`;

const Select = styled.select`
  background: rgba(13, 13, 13, 0.6);
  border: 1px solid rgba(159, 0, 255, 0.2);
  padding: 1rem;
  border-radius: 8px;
  color: #fff;
  font-family: 'Roboto Mono', monospace;

  &:focus {
    outline: none;
    border-color: #9F00FF;
    box-shadow: 0 0 10px rgba(159, 0, 255, 0.2);
  }

  option {
    background: #1a1a1a;
    color: #fff;
  }
`;

const Button = styled.button`
  background: rgba(159, 0, 255, 0.1);
  border: 1px solid #9F00FF;
  padding: 1rem;
  border-radius: 8px;
  color: #9F00FF;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 0 5px rgba(159, 0, 255, 0.3);

  &:hover {
    background: rgba(159, 0, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(159, 0, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const PreviewButton = styled(Button)`
  background: rgba(0, 255, 128, 0.1);
  border-color: #00FF80;
  color: #00FF80;
  text-shadow: 0 0 5px rgba(0, 255, 128, 0.3);

  &:hover {
    background: rgba(0, 255, 128, 0.2);
    box-shadow: 0 5px 15px rgba(0, 255, 128, 0.2);
  }
`;

const PreviewSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(26, 26, 26, 0.9);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 128, 0.2);

  h2 {
    color: #00FF80;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 1rem;
    text-shadow: 0 0 5px rgba(0, 255, 128, 0.3);
  }

  .preview-content {
    font-family: 'Roboto', sans-serif;
    color: #fff;
    line-height: 1.6;

    pre {
      background: #2d2d2d;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      margin: 1rem 0;
    }

    code {
      font-family: 'Roboto Mono', monospace;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }

    iframe {
      max-width: 100%;
      border-radius: 4px;
      margin: 1rem 0;
    }
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #FF4444;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const StatusGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #0F0;
  font-size: 1.2rem;
  padding: 2rem;
`;

const FileUploadArea = styled.div`
  border: 2px dashed rgba(159, 0, 255, 0.3);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #9F00FF;

  &:hover {
    border-color: #9F00FF;
    background: rgba(159, 0, 255, 0.05);
  }

  input {
    display: none;
  }
`;

const UploadedFiles = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilePreview = styled.div`
  background: rgba(159, 0, 255, 0.1);
  border: 1px solid rgba(159, 0, 255, 0.2);
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #9F00FF;
  font-size: 0.9rem;

  button {
    background: none;
    border: none;
    color: #FF4444;
    cursor: pointer;
    padding: 0 0.25rem;
  }
`;

const AttachmentsSection = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 255, 0, 0.2);

  h3 {
    color: #0F0;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  .attachments-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .attachment-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #0F0;
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 4px;
    background: rgba(0, 255, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 255, 0, 0.1);
      transform: translateX(5px);
    }

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

const editorConfig = {
  height: 500,
  menubar: true,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
    'codesample', 'paste'
  ],
  toolbar: 'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help | codesample | image media | link',
  content_style: `
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
      color: #fff;
      background: #1a1a1a;
    }
    pre.language-* {
      background: #2d2d2d;
      padding: 1em;
      margin: 0.5em 0;
      border-radius: 4px;
    }
    code {
      font-family: 'Roboto Mono', monospace;
    }
    .mce-content-body [data-mce-selected="inline-boundary"] {
      background: rgba(159, 0, 255, 0.2);
    }
  `,
  skin: 'oxide-dark',
  content_css: 'dark',
  codesample_languages: [
    { text: 'HTML/XML', value: 'markup' },
    { text: 'JavaScript', value: 'javascript' },
    { text: 'TypeScript', value: 'typescript' },
    { text: 'CSS', value: 'css' },
    { text: 'PHP', value: 'php' },
    { text: 'Python', value: 'python' },
    { text: 'Java', value: 'java' },
    { text: 'C', value: 'c' },
    { text: 'C++', value: 'cpp' },
    { text: 'C#', value: 'csharp' },
    { text: 'Ruby', value: 'ruby' },
    { text: 'Bash', value: 'bash' },
    { text: 'SQL', value: 'sql' },
    { text: 'JSON', value: 'json' }
  ],
  file_picker_callback: (callback: FilePickerCallback, value: string, meta: FilePickerMeta) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    
    input.onchange = () => {
      if (!input.files?.length) return;
      const file = input.files[0];
      
      const reader = new FileReader();
      reader.onload = () => {
        callback(reader.result as string, {
          title: file.name,
          text: file.name,
          alt: file.name
        });
      };
      reader.readAsDataURL(file);
    };
    
    input.click();
  },
  paste_data_images: true,
  convert_urls: false,
  media_live_embeds: true
};

export const EditPost: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('CODE_TUTORIAL');
  const [excerpt, setExcerpt] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState<PostStatus>(PostStatus.DRAFT);
  const [initialStatus, setInitialStatus] = useState<PostStatus>(PostStatus.DRAFT);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/posts/admin/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const post = await response.json();
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
        setExcerpt(post.excerpt);
        const currentStatus = post.isPublished ? PostStatus.PUBLISHED : PostStatus.DRAFT;
        setStatus(currentStatus);
        setInitialStatus(currentStatus);
        setUploadedFiles(post.files || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, token]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);

      // Upload files immediately
      for (const file of newFiles) {
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          const response = await fetch('http://localhost:4000/api/upload', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          });

          if (!response.ok) throw new Error('Failed to upload file');
          
          const data = await response.json();
          setUploadedFiles(prev => [...prev, { name: file.name, url: data.url }]);
        } catch (err) {
          console.error('File upload error:', err);
          setError('Failed to upload file');
        }
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const isPublishing = status === PostStatus.PUBLISHED && initialStatus === PostStatus.DRAFT;
      
      const response = await fetch(`http://localhost:4000/api/posts/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          category,
          excerpt,
          files: uploadedFiles,
          isPublished: status === PostStatus.PUBLISHED,
          updateCreatedAt: isPublishing
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const data = await response.json();

      if (status === PostStatus.DRAFT) {
        navigate('/dashboard/drafts');
      } else {
        const categoryPath = category === 'CODE_TUTORIAL' ? 'tutorials' : 'pentesting';
        navigate(`/${categoryPath}/${data.post.slug}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  if (loading) {
    return <LoadingMessage>Loading post...</LoadingMessage>;
  }

  return (
    <Container>
      <GoBackButton onClick={() => navigate('/dashboard')}>Go Back</GoBackButton>
      <EditorCard>
        <Title>Edit Post</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="CODE_TUTORIAL">Code Tutorial</option>
            <option value="PENTESTING">Pentesting</option>
          </Select>

          <Input
            type="text"
            placeholder="Short excerpt/description"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />

          <FileUploadArea>
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
            />
            <label htmlFor="file-upload">
              Drop files here or click to upload attachments
            </label>
            <UploadedFiles>
              {uploadedFiles.map((file, index) => (
                <FilePreview key={index}>
                  <span>{file.name}</span>
                  <button type="button" onClick={() => removeFile(index)}>×</button>
                </FilePreview>
              ))}
            </UploadedFiles>
          </FileUploadArea>

          <StatusGroup>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as PostStatus)}
              required
            >
              <option value={PostStatus.DRAFT}>Draft</option>
              <option value={PostStatus.PUBLISHED}>Published</option>
            </Select>
          </StatusGroup>

          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            init={editorConfig}
            value={content}
            onEditorChange={(content: string) => setContent(content)}
          />

          <ButtonGroup>
            <PreviewButton type="button" onClick={togglePreview}>
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </PreviewButton>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : status === PostStatus.DRAFT ? 'Save Draft' : 'Update Post'}
            </Button>
          </ButtonGroup>
        </Form>

        {showPreview && (
          <PreviewSection>
            <h2>Preview</h2>
            <div 
              className="preview-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {uploadedFiles.length > 0 && (
              <AttachmentsSection>
                <h3>Attachments</h3>
                <div className="attachments-list">
                  {uploadedFiles.map((file, index) => (
                    <a 
                      key={index}
                      href={`http://localhost:4000${file.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="attachment-link"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {file.name}
                    </a>
                  ))}
                </div>
              </AttachmentsSection>
            )}
          </PreviewSection>
        )}
      </EditorCard>
    </Container>
  );
};

export default EditPost;
