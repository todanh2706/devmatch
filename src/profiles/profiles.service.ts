import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  //   private profiles = [
  //     {
  //       id: randomUUID(),
  //       name: 'Danh',
  //       description: 'Handsome man',
  //     },
  //     {
  //       id: randomUUID(),
  //       name: 'Vy',
  //       description: 'Beautiful girl',
  //     },
  //   ];

  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async findAll(): Promise<Profile[]> {
    // return this.profiles.find();
    return await this.profileRepository.find();
  }

  async findOne(id: UUID): Promise<Profile> {
    // const matchingProfile = this.profiles.find((profile) => profile.id === id);
    const matchingProfile = await this.profileRepository.findOneBy({ id });

    if (matchingProfile === null) {
      //   throw new NotFoundException(`Profile with ID ${id} not found.`);

      throw new Error(`Profile with ID ${id} not found.`);
    }

    return matchingProfile;
  }

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    // const createdProfile = {
    //   id: randomUUID(),
    //   ...creatProfileDto,
    // };

    // this.profiles.push(createdProfile);
    const newProfile = this.profileRepository.create(createProfileDto);
    return await this.profileRepository.save(newProfile);
  }

  async update(id: UUID, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    // const matchingProfile = this.profiles.find(
    //   (existingProfile) => existingProfile.id === id,
    // );
    const matchingProfile = await this.profileRepository.findOneBy({ id });

    if (matchingProfile === null) {
      throw new NotFoundException(`Profile with ID ${id} not found.`);
    }

    matchingProfile.name = updateProfileDto.name;
    matchingProfile.description = updateProfileDto.description;

    return await this.profileRepository.save(matchingProfile);
  }

  async remove(id: UUID): Promise<void> {
    // const matchingProfileIndex = this.profiles.findIndex(
    //   (existingProfile) => existingProfile.id === id,
    // );

    const result = await this.profileRepository.delete(id);

    // if (matchingProfile === null) {
    //   throw new NotFoundException(`Profile with ID ${id} not found.`);
    // }

    if (result.affected === 0) {
      throw new NotFoundException(`Profile with ID ${id} not found.`);
    }

    // this.profiles.splice(matchingProfileIndex, 1);
  }
}
