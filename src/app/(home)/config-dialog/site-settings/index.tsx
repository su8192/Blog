'use client'

import type { SiteContent } from '../../stores/config-store'
import type { ArtImageUploads, BackgroundImageUploads, FileItem, SocialButtonImageUploads } from './types'
import { FaviconAvatarUpload } from './favicon-avatar-upload'
import { SiteMetaForm } from './site-meta-form'
import { ArtImagesSection } from './art-images-section'
import { BackgroundImagesSection } from './background-images-section'
import { SocialButtonsSection } from './social-buttons-section'
import { HatSection } from './hat-section'
import { BeianForm } from './beian-form'

export type { FileItem, ArtImageUploads, BackgroundImageUploads, SocialButtonImageUploads } from './types'

interface SiteSettingsProps {
	formData: SiteContent
	setFormData: React.Dispatch<React.SetStateAction<SiteContent>>
	faviconItem: FileItem | null
	setFaviconItem: React.Dispatch<React.SetStateAction<FileItem | null>>
	avatarItem: FileItem | null
	setAvatarItem: React.Dispatch<React.SetStateAction<FileItem | null>>
	artImageUploads: ArtImageUploads
	setArtImageUploads: React.Dispatch<React.SetStateAction<ArtImageUploads>>
	backgroundImageUploads: BackgroundImageUploads
	setBackgroundImageUploads: React.Dispatch<React.SetStateAction<BackgroundImageUploads>>
	socialButtonImageUploads: SocialButtonImageUploads
	setSocialButtonImageUploads: React.Dispatch<React.SetStateAction<SocialButtonImageUploads>>
}

export function SiteSettings({
	formData,
	setFormData,
	faviconItem,
	setFaviconItem,
	avatarItem,
	setAvatarItem,
	artImageUploads,
	setArtImageUploads,
	backgroundImageUploads,
	setBackgroundImageUploads,
	socialButtonImageUploads,
	setSocialButtonImageUploads
}: SiteSettingsProps) {
	return (
		<div className='space-y-6'>
			<FaviconAvatarUpload faviconItem={faviconItem} setFaviconItem={setFaviconItem} avatarItem={avatarItem} setAvatarItem={setAvatarItem} />

			<SiteMetaForm formData={formData} setFormData={setFormData} />

			<BeianForm formData={formData} setFormData={setFormData} />

			<SocialButtonsSection
				formData={formData}
				setFormData={setFormData}
				socialButtonImageUploads={socialButtonImageUploads}
				setSocialButtonImageUploads={setSocialButtonImageUploads}
			/>

			<ArtImagesSection formData={formData} setFormData={setFormData} artImageUploads={artImageUploads} setArtImageUploads={setArtImageUploads} />

			<BackgroundImagesSection
				formData={formData}
				setFormData={setFormData}
				backgroundImageUploads={backgroundImageUploads}
				setBackgroundImageUploads={setBackgroundImageUploads}
			/>

			<div className='flex gap-3'>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={formData.clockShowSeconds ?? false}
						onChange={e => setFormData({ ...formData, clockShowSeconds: e.target.checked })}
						className='accent-brand h-4 w-4 rounded'
					/>
					<span className='text-sm font-medium'>时钟显示秒数</span>
				</label>

				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={formData.summaryInContent ?? false}
						onChange={e => setFormData({ ...formData, summaryInContent: e.target.checked })}
						className='accent-brand h-4 w-4 rounded'
					/>
					<span className='text-sm font-medium'>摘要放入内容</span>
				</label>

				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={formData.hideEditButton ?? false}
						onChange={e => setFormData({ ...formData, hideEditButton: e.target.checked })}
						className='accent-brand h-4 w-4 rounded'
					/>
					<span className='text-sm font-medium'>隐藏编辑按钮（编辑快捷键 ctrl/cmd + ,）</span>
				</label>
			</div>
			<div className='flex gap-3'>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={formData.isCachePem ?? false}
						onChange={e => setFormData({ ...formData, isCachePem: e.target.checked })}
						className='accent-brand h-4 w-4 rounded'
					/>
					<span className='text-sm font-medium'>缓存PEM(已加密，但存在风险)</span>
				</label>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={formData.enableCategories ?? false}
						onChange={e => setFormData({ ...formData, enableCategories: e.target.checked })}
						className='accent-brand h-4 w-4 rounded'
					/>
					<span className='text-sm font-medium'>启用文章分类</span>
				</label>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={formData.enableChristmas ?? false}
						onChange={e => setFormData({ ...formData, enableChristmas: e.target.checked })}
						className='accent-brand h-4 w-4 rounded'
					/>
					<span className='text-sm font-medium'>开启圣诞节</span>
				</label>
			</div>

			<div className='mt-4'>
				{formData.enablePasswordAccess && (
					<div className='bg-secondary/10 flex-1 min-w-[120px] rounded-lg border p-2 text-sm relative'>
						<div className='absolute top-2 right-2'>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={formData.enablePasswordAccess ?? false}
									onChange={e => setFormData({ ...formData, enablePasswordAccess: e.target.checked })}
									className='accent-brand h-4 w-4 rounded'
								/>
								<span className='text-sm font-medium'>开启密码访问</span>
							</label>
						</div>

						<div className='space-y-2 mt-8'>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={(formData.passwordAccessCategories ?? []).includes('Notes')}
									onChange={(e) => {
										let updatedCategories = [...(formData.passwordAccessCategories ?? [])];
										if (e.target.checked) {
											if (!updatedCategories.includes('Notes')) {
												updatedCategories.push('Notes');
											}
										} else {
											updatedCategories = updatedCategories.filter(cat => cat !== 'Notes');
										}
										setFormData({ ...formData, passwordAccessCategories: updatedCategories });
									}}
									className='accent-brand h-4 w-4 rounded'
								/>
								<span>{formData.passwordAccessPassword && (formData.passwordAccessCategories ?? []).includes('Notes') ? '🔒' : '🔓'} 笔记</span>
							</label>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={(formData.passwordAccessCategories ?? []).includes('Soft')}
									onChange={(e) => {
										let updatedCategories = [...(formData.passwordAccessCategories ?? [])];
										if (e.target.checked) {
											if (!updatedCategories.includes('Soft')) {
												updatedCategories.push('Soft');
											}
										} else {
											updatedCategories = updatedCategories.filter(cat => cat !== 'Soft');
										}
										setFormData({ ...formData, passwordAccessCategories: updatedCategories });
									}}
									className='accent-brand h-4 w-4 rounded'
								/>
								<span>{formData.passwordAccessPassword && (formData.passwordAccessCategories ?? []).includes('Soft') ? '🔒' : '🔓'} 软件</span>
							</label>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={(formData.passwordAccessCategories ?? []).includes('Games')}
									onChange={(e) => {
										let updatedCategories = [...(formData.passwordAccessCategories ?? [])];
										if (e.target.checked) {
											if (!updatedCategories.includes('Games')) {
												updatedCategories.push('Games');
											}
										} else {
											updatedCategories = updatedCategories.filter(cat => cat !== 'Games');
										}
										setFormData({ ...formData, passwordAccessCategories: updatedCategories });
									}}
									className='accent-brand h-4 w-4 rounded'
								/>
								<span>{formData.passwordAccessPassword && (formData.passwordAccessCategories ?? []).includes('Games') ? '🔒' : '🔓'} 游戏</span>
							</label>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={(formData.passwordAccessCategories ?? []).includes('Chara')}
									onChange={(e) => {
										let updatedCategories = [...(formData.passwordAccessCategories ?? [])];
										if (e.target.checked) {
											if (!updatedCategories.includes('Chara')) {
												updatedCategories.push('Chara');
											}
										} else {
											updatedCategories = updatedCategories.filter(cat => cat !== 'Chara');
										}
										setFormData({ ...formData, passwordAccessCategories: updatedCategories });
									}}
									className='accent-brand h-4 w-4 rounded'
								/>
								<span>{formData.passwordAccessPassword && (formData.passwordAccessCategories ?? []).includes('Chara') ? '🔒' : '🔓'} 角色</span>
							</label>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={(formData.passwordAccessCategories ?? []).includes('blog')}
									onChange={(e) => {
										let updatedCategories = [...(formData.passwordAccessCategories ?? [])];
										if (e.target.checked) {
											if (!updatedCategories.includes('blog')) {
												updatedCategories.push('blog');
											}
										} else {
											updatedCategories = updatedCategories.filter(cat => cat !== 'blog');
										}
										setFormData({ ...formData, passwordAccessCategories: updatedCategories });
									}}
									className='accent-brand h-4 w-4 rounded'
								/>
								<span>{formData.passwordAccessPassword && (formData.passwordAccessCategories ?? []).includes('blog') ? '🔒' : '🔓'} 博客</span>
							</label>
						</div>

						<div className='absolute bottom-2 right-2 w-40'>
							<input
								type='password'
								placeholder='请输入密码'
								className='bg-secondary/10 w-full rounded-lg border px-3 py-2 text-sm'
								value={formData.passwordAccessPassword ?? ''}
								onChange={(e) => setFormData({ ...formData, passwordAccessPassword: e.target.value })}
							/>
						</div>
					</div>
				)}

				{!formData.enablePasswordAccess && (
					<label className='flex items-center gap-2'>
						<input
							type='checkbox'
							checked={formData.enablePasswordAccess ?? false}
							onChange={e => setFormData({ ...formData, enablePasswordAccess: e.target.checked })}
							className='accent-brand h-4 w-4 rounded'
						/>
						<span className='text-sm font-medium'>开启密码访问</span>
					</label>
				)}
			</div>

			<HatSection formData={formData} setFormData={setFormData} />
		</div>
	)
}
